import { FactoryProvider } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";

/**
 * Imports the auth servivce with token requested.
 */
export const AuthFactory:FactoryProvider = {
    provide: 'ASYNC_CONNECTION',
    useFactory: async (authProvider: AuthService) => await authProvider.load(),
    inject: [AuthService]
}