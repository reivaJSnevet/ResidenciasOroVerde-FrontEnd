import {useLocation, Navigate, Outlet} from 'react-router-dom';
import useAuthStore from '../../hooks/auth/useAuth';

const RequireAuth = ({allowedRoles}) => {
    const auth = useAuthStore((state) => state.auth);
    const location = useLocation();

    return (
        allowedRoles.includes(auth?.user?.Rol.nombre)
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" />
                : <Navigate to="/login" state={{from: location}} replace />
    )
};

export default RequireAuth;