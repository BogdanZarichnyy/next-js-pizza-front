import NextAuth from "next-auth";
import { authOptions } from "../../../../shared/constants";

// export default NextAuth(authOptions); // це працюватиме тільки у Pages Router, тобто у pages/api/auth/[...nextauth].ts

// для App Router потрібно переписати так:
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };