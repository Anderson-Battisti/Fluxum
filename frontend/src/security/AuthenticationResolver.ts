/**
 * 
 * @author Anderson Battisti
 */
import { AuthState } from "./AuthState";
import { HttpStatus } from "../constants/HttpStatus";

export class AuthenticationResolver
{
    public static async getAuthState(): Promise<AuthState>
    {
        try
        {
            const response = await fetch( `${import.meta.env.VITE_API_URL}/auth/me`, { credentials: "include" } );
            
            if ( response.status === HttpStatus.OK )
            {
                return "authenticated";
            }
        }
        
        catch ( error )
        {
            return "unauthenticated";
        }
        
        return "unauthenticated";
    }
}