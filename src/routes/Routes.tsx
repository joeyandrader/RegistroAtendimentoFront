import { createBrowserRouter } from 'react-router'
import Home from '../app/Home/Home';
import App from '../App';
import Usuario from '../app/user/view/Usuario';
import { Register } from '../app/user/view/Register';
import { EditUser } from '../app/user/view/EditUser';
import { Appointment } from '../app/appointment/view/Appointment';
import { AppointmentRegister } from '../app/appointment/view/AppointmentRegister';
import { AppointmentEdit } from '../app/appointment/view/AppointmentEdit';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/usuarios",
                element: <Usuario />
            },
            {
                path: "/usuarios/cadastro",
                element: <Register />
            },
            {
                path: "/usuarios/edit/:id",
                element: <EditUser />
            },
            {
                path: "/agendamentos",
                element: <Appointment />
            },
            {
                path: "/agendamentos/cadastro",
                element: <AppointmentRegister />
            },
            {
                path: "/agendamentos/edit/:id",
                element: <AppointmentEdit />
            }
        ]
    }
]);

export { router }