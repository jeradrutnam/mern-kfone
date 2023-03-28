/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {useAuthContext} from '@asgardeo/auth-react';
import {useEffect, useState} from 'react';
import {UserGroups} from '../models/user';
import AccessControlContext from '../contexts/access-control-context';
import routesConfig from '../configs/routes-config';

const DEFAULT_ACCESS_CONTROL = {
  dashboard: false,
  devices: false,
  services: false,
  promotions: false,
};

const AccessControlProvider = ({children}) => {
  const {state, getDecodedIDToken, signIn, trySignInSilently} = useAuthContext();
  const {isAuthenticated, isLoading} = state;

  const [accessControl, setAccessControl] = useState(DEFAULT_ACCESS_CONTROL);
  const [initialActiveRoute, setInitialActiveRoute] = useState(routesConfig.dashboard);
  const [decodedIdToken, setDecodedIdToken] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await trySignInSilently();

        if (!response) {
          signIn();
        }
      } catch (e) {
        signIn();
      }
    })();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      signIn();
    }
  }, [isAuthenticated, isLoading, signIn]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    (async () => {
      const idToken = await getDecodedIDToken();
      let _accessControl = {...DEFAULT_ACCESS_CONTROL};
      let _initialActiveRoute = initialActiveRoute;

      if (idToken?.groups.includes(UserGroups.Admin)) {
        _accessControl = Object.fromEntries(Object.entries(DEFAULT_ACCESS_CONTROL).map(([key, _]) => [key, true]));
        _initialActiveRoute = routesConfig.dashboard;
      } else if (idToken?.groups.includes(UserGroups.Sales)) {
        _accessControl = {
          ...Object.fromEntries(Object.entries(DEFAULT_ACCESS_CONTROL).map(([key, _]) => [key, false])),
          promotions: true,
        };
        _initialActiveRoute = routesConfig.promotions;
      } else if (idToken?.groups.includes(UserGroups.Marketing)) {
        _accessControl = {
          ...Object.fromEntries(Object.entries(DEFAULT_ACCESS_CONTROL).map(([key, _]) => [key, false])),
          dashboard: true,
        };
        _initialActiveRoute = routesConfig.dashboard;
      } else {
        // TODO: Route to an unauthorized page.
      }

      setInitialActiveRoute(_initialActiveRoute);
      setDecodedIdToken(idToken);
      setAccessControl(_accessControl);
    })();
  }, [getDecodedIDToken, isAuthenticated, initialActiveRoute]);

  const resolveProfile = () => {
    let profile = {...decodedIdToken};

    if (decodedIdToken.given_name || decodedIdToken.family_name) {
      profile = {
        ...profile,
        display_name: `${decodedIdToken.given_name} ${decodedIdToken.family_name}`,
      };
    } else if (decodedIdToken.preferred_username) {
      profile = {
        ...profile,
        display_name: decodedIdToken.preferred_username.preferred_username,
      };
    } else if (decodedIdToken.username) {
      profile = {
        ...profile,
        display_name: decodedIdToken.username,
      };
    } else {
      profile = {
        ...profile,
        display_name: decodedIdToken.sub,
      };
    }

    return profile;
  };

  return (
    <AccessControlContext.Provider value={{access: accessControl, profile: resolveProfile(), initialActiveRoute}}>
      {children}
    </AccessControlContext.Provider>
  );
};

export default AccessControlProvider;
