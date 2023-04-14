import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ hasAccepted, redirectPath = '/disclaimer' }) {
    if (!hasAccepted) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />
}

export default PrivateRoute;