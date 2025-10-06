import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { PrismaClient } from "@/generated/prisma";
import { username } from "better-auth/plugins";
import { usernameValidator } from "./utils";

const prisma = new PrismaClient();
export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	plugins: [
		username({
			minUsernameLength: 4,
			maxUsernameLength: 20,
			usernameValidator: (username) => usernameValidator(username),
		})
	],
	emailAndPassword: {
		enabled: true,
	},
	user: {
		additionalFields: {
			lastName: {
				type: "string",
				required: false,
				maxLength: 50,
				minLength: 2
			}
		}
	}
});
