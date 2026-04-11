import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";


const ProtectedRoute = ({ children, allowedRole }) => {
    const location = useLocation();
    const { user, loading } = useSelector((store) => store.auth);

    useEffect(() => {
        if (loading) return;

        if (!user) {
            toast.error("authentication error", { id: "auth-error" });
            return;
        }

        if (user.role !== allowedRole) {
            toast.error("your role doesnt allow that action", { id: "role-error" });
        }
    }, [allowedRole, loading, user]);

    if (loading) return null;
    if (!user) {
        return <Navigate to="/auth" replace state={{ from: location }} />;
    }
    if (user.role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;