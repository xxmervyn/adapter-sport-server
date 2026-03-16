interface FetchProxy {
    fetch: (req: Request) => Promise<Response>;
}

interface Env {
    INNER_FETCH?: FetchProxy | null;
}


declare const env: Env;