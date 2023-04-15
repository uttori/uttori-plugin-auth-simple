declare module '@uttori/plugin-auth-simple';

declare module 'index' {
    type AuthSimpleConfigEvents = {
        bindRoutes: string[];
        validateConfig: string[];
    };
    type AuthSimpleConfig = {
        events?: AuthSimpleConfigEvents;
        loginPath?: string;
        loginRedirectPath?: string;
        loginMiddleware?: Function[];
        logoutPath?: string;
        logoutRedirectPath?: string;
        logoutMiddleware?: Function[];
        validateLogin: Function;
    };
    export class AuthSimple {
      static get configKey(): string;

      static defaultConfig(): AuthSimpleConfig;

      static validateConfig(config: {
            configKey: object;
        }, _context: object): void;

      static register(context: {
            hooks: {
                on: Function;
            };
            config: {
                events: object;
            };
        }): void;

      static bindRoutes(server: {
            post: Function;
        }, context: {
            config: object;
        }): void;

      static login(context: {
            config: object;
        }): Function;

      static logout(context: {
            config: object;
        }): Function;
    }
    namespace AuthSimple {
        export { AuthSimpleConfigEvents, AuthSimpleConfig };
    }
}
