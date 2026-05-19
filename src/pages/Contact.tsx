import { useState, type FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

type FormState = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

type ErrorState = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  useSEO({
    title: 'Contact Us — GlobalTax',
    description: 'Get in touch with the GlobalTax team. We respond within 24–48 hours. Questions about our tax calculators, errors to report, or suggestions welcome.',
    canonical: 'https://taxnova.com/contact',
  });

  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<ErrorState>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const validate = () => {
    const nextErrors: ErrorState = {};
    if (form.fullName.trim().length < 3) nextErrors.fullName = "Name must be at least 3 characters.";
    if (!form.email.includes("@")) nextErrors.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10) nextErrors.message = "Message must be at least 10 characters.";
    return nextErrors;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess("");
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setForm(initialFormState);
      setErrors({});
      setSuccess("Message sent successfully (demo)");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="mx-auto w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Contact Us</h1>
          <p className="mt-3 text-lg text-slate-600">We usually respond within 24–48 hours</p>
        </div>

        <Card className="rounded-xl shadow-2xl border border-slate-100 bg-white overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <form className="space-y-5" onSubmit={onSubmit} noValidate>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input
                  value={form.fullName}
                  onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-slate-300"
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-slate-300"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                <input
                  value={form.subject}
                  onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-slate-300"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  rows={6}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-slate-300 resize-none"
                  placeholder="Tell us what you need..."
                />
                {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
              </div>

              {success && (
                <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            <div className="mt-8 rounded-2xl bg-slate-50 p-5 transition-all duration-200 hover:bg-slate-100">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Contact Info</h2>
              <div className="grid gap-3 text-slate-700">
                <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-blue-600" /> 📧 Email: support@smarttaxtools.com</div>
                <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-blue-600" /> 📞 Phone: +44 123 456 7890</div>
                <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-blue-600" /> 📍 Location: London, UK (Virtual Office)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}