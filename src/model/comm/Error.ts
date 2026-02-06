
export class FbApiError extends Error {
    constructor(
        message: string,
        public status?: number,
        public url?: string,
        public errData?: any,
    ) {
        super(message);
        this.name = 'ApiError';
    }
}