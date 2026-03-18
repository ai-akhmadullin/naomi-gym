import { redirect } from "next/navigation";

import { DEFAULT_LOCALE, getLocalePath } from "@/lib/i18n";

export default function BuyMembershipPage() {
  redirect(getLocalePath(DEFAULT_LOCALE, "/buy-membership"));
}
