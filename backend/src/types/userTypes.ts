export interface UserAttributes {
    user_id?: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: number;
    created_at: string;
    updated_at: string;
    created_by?: number;
}