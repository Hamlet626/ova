/// module augmentation on 'User' on 'next-auth',
// for custom [User] info shown by getServerSession used on 'server' components.
// Whereas this just makes the type hint prompting while coding

export interface AddiUser {
    role: number,
    phone?: string|null,
    fbPath?: string|null
}