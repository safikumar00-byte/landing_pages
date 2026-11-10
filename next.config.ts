import type { NextConfig } from "next";
import { landingPages } from "./src/lib/landing-pages";

const archiveFiles = landingPages.flatMap((page) => {
	const slash = page.path.lastIndexOf("/");
	const directory = slash === -1 ? "" : `${page.path.slice(0, slash + 1)}`;
	const filename = page.path.slice(slash + 1);
	const stem = filename.replace(/\.[^.]+$/, "");

	return [`./${page.path}`, `./${directory}${stem}_files/**/*`];
});

const nextConfig: NextConfig = {
	outputFileTracingIncludes: {
		"/archive/*": archiveFiles,
	},
};

export default nextConfig;