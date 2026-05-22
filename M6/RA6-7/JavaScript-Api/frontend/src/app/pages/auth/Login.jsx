"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../services/user.service";

const Login = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.pass.value;
        setLoading(true);

        try {
            const res = await login({ email, password });
            setError("");
            if (res.data?.profile) {
                localStorage.setItem("user", JSON.stringify(res.data.profile));
                window.dispatchEvent(new Event("auth-changed"));
            }
            router.push("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col gap-5 bg-white border-2 border-orange-500 rounded-2xl p-6 md:p-8 shadow-lg"
            >
                <h1 className="text-2xl md:text-3xl font-semibold text-center text-orange-600">
                    Log in
                </h1>

                <label htmlFor="email" className="flex flex-col gap-1 text-sm font-medium">
                    Email
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300 text-base"
                    />
                    <span className="mt-2 block text-sm text-slate-600">
                        <strong>Important:</strong> aquest camp és obligatori.
                    </span>
                </label>

                <label htmlFor="pass" className="flex flex-col gap-1 text-sm font-medium">
                    Password
                    <input
                        type="password"
                        name="pass"
                        id="pass"
                        required
                        className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300 text-base"
                    />
                </label>

                {error && (
                    <p role="alert" className="text-sm text-red-600 text-center">
                        {error}
                    </p>
                )}

                <button
                    aria-busy={loading ? "true" : "false"}
                    type="submit"
                    className="mt-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 transition-colors hover:cursor-pointer"
                >
                    {loading ? "Desant..." : "Log in"}
                </button>
            </form>
        </main>
    );
};

export default Login;
