import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { getServerAuthSession } from "~/server/auth";

export default async function Profile() {
  const session = await getServerAuthSession();

  return (
    <div className="mx-auto max-w-xl p-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2">
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input id="email" value={session?.user.email} readOnly />
        </div>

        <div className="grid grid-cols-2">
          <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-700">
            First name
          </label>
          <Input id="firstName" value={session?.user.name} readOnly />
        </div>

        <div className="grid grid-cols-2">
          <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-700">
            Last name
          </label>
          <Input id="lastName" placeholder="Last name" />
        </div>

        <div className="grid grid-cols-2">
          <label htmlFor="companyName" className="mb-1 block text-sm font-medium text-gray-700">
            Company name
          </label>
          <Input id="companyName" placeholder="Company name" />
        </div>

        <div className="grid grid-cols-2">
          <label htmlFor="morgenPlan" className="mb-1 block text-sm font-medium text-gray-700">
            Morgen plan
          </label>
          <Input id="morgenPlan" value="14-days Pro Trial" readOnly />
        </div>

        <div className="grid grid-cols-2">
          <label htmlFor="accountId" className="mb-1 block text-sm font-medium text-gray-700">
            Account id
          </label>
          <Input id="accountId" value={session?.user.id} readOnly />
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        During your trial you have access to most of the Pro features, including unlimited connected accounts and
        workflows. After the trial expiration, you will be switched to the free plan automatically. White-labeling is
        not available during the trial. This plan is valid until September 24th 2024.
      </p>

      <p className="mt-4 text-sm text-gray-600">
        For any questions about your plan, please{" "}
        <a href="#" className="text-indigo-600 hover:underline">
          contact us
        </a>
        .
      </p>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <Button variant="outline" className="mr-2">
            Manage profile
          </Button>
          <Button variant="outline">Sign out</Button>
        </div>
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">Upgrade your plan</Button>
      </div>
    </div>
  );
}
