import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    organizationId?: string;
    role?: string;
    plan?: string;
    orgName?: string;
    orgSlug?: string;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      organizationId?: string;
      role?: string;
      plan?: string;
      orgName?: string;
      orgSlug?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    organizationId?: string;
    role?: string;
    plan?: string;
    orgName?: string;
    orgSlug?: string;
  }
}
