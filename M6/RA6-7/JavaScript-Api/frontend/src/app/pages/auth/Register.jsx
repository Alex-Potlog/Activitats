"use client";

import { useState } from "react";
import { register } from "../../services/user.service";

const Register = () => {
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = form.name.value;
        const surname = form.surname.value;
        const email = form.email.value;
        const pass = form.pass.value;
        const passConfirm = form.passConfirm.value;

        if (pass !== passConfirm) {
            setError("Passwords do not match");
            return;
        }

        setSaving(true);
        try {
            const res = await register({ name, surname, email, password: pass });
            setError("");
            console.log("Register OK", res.data);
        } catch (err) {
            const data = err.response?.data;
            setError(
                data?.message ||
                (data?.errors && Object.values(data.errors)[0]) ||
                "Registration failed"
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col gap-5 bg-white border-2 border-orange-500 rounded-2xl p-6 md:p-8 shadow-lg"
            >
                <h1 className="text-2xl md:text-3xl font-semibold text-center text-orange-600">
                    Create account
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label htmlFor="name" className="flex flex-col gap-1 text-sm font-medium">
                        Name
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300 text-base"
                        />
                    </label>

                    <label htmlFor="surname" className="flex flex-col gap-1 text-sm font-medium">
                        Surname
                        <input
                            type="text"
                            name="surname"
                            id="surname"
                            required
                            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300 text-base"
                        />
                    </label>
                </div>

                { /* Email */}
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

                { /* Contrasenya */}
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

                { /* Contrasenya */}
                <label htmlFor="passConfirm" className="flex flex-col gap-1 text-sm font-medium">
                    Repeat password
                    <input
                        type="password"
                        name="passConfirm"
                        id="passConfirm"
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
                    aria-busy={saving ? "true" : "false"}
                    type="submit"
                    className="mt-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 transition-colors hover:cursor-pointer"
                >
                    {saving ? "Desant..." : "Sign up"}
                </button>
            </form>
        </main>
    );
};

export default Register;
