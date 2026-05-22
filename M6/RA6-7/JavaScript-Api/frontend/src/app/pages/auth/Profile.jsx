"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile, logout } from "../../services/user.service";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const res = await getProfile();
                if (cancelled) return;
                const data = res.data?.profile ?? res.data;
                setProfile(data);
                localStorage.setItem("user", JSON.stringify(data));
                window.dispatchEvent(new Event("auth-changed")); //Aquesta és la millor forma que he trobat per poder enviar l'event que s'ha fet login pq s'alteri el header
            } catch (err) {
                if (cancelled) return;

                setError(err.response?.data?.message || "Could not load profile");

                if (err.response?.status === 401) {
                    localStorage.removeItem("user");
                    window.dispatchEvent(new Event("auth-changed"));
                    router.push("/login");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [router]);

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            localStorage.removeItem("user");
            window.dispatchEvent(new Event("auth-changed"));
            router.push("/login");
        }
    };

    return (
        <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
            <section className="w-full max-w-md flex flex-col gap-5 bg-white border-2 border-orange-500 rounded-2xl p-6 md:p-8 shadow-lg">
                <h2 className="text-2xl md:text-3xl font-semibold text-center text-orange-600">
                    Profile
                </h2>

                <blockquote className="border-l-4 border-orange-500 pl-4 italic text-slate-700">
                    Gestió del teu perfil d'usuari.
                </blockquote>

                <p aria-live="polite" className="text-sm text-slate-600 text-center">
                    {loading
                        ? "Carregant dades..."
                        : profile
                          ? "Dades carregades correctament"
                          : error
                            ? "No s'han pogut carregar les dades del perfil"
                            : ""}
                </p>

                {error && (
                    <p role="alert" className="text-sm text-red-600 text-center">
                        {error}
                    </p>
                )}

                {profile && !loading && (
                    <dl className="flex flex-col gap-3 text-sm md:text-base">
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 pb-2">
                            <dt className="font-medium">Name</dt>
                            <dd className="break-words">{profile.name}</dd>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 pb-2">
                            <dt className="font-medium">Surname</dt>
                            <dd className="break-words">{profile.surname}</dd>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 pb-2">
                            <dt className="font-medium">Email</dt>
                            <dd className="break-words">{profile.email}</dd>
                        </div>
                    </dl>
                )}

                <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 transition-colors hover:cursor-pointer"
                >
                    Log out
                </button>
            </section>
        </main>
    );
};

export default Profile;
