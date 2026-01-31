import { AuthView, authViewPaths } from "@repo/ui/better-auth-ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(authViewPaths).map((path) => ({ path }));
}

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center w-full">
          <AuthView
            path={path}
            classNames={{
              base: "border-none w-full",
              header: "text-2xl font-bold mb-4 text-center",

              footer: "text-sm text-gray-500 mt-2",
            }}
          />
        </div>
      </div>

      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
