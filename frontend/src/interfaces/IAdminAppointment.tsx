
export default interface IAdminAppointment {
    appointment_id: number;
    time: string;
    date: string;
    note: string;
    user_id: number;
    firstname: string;
    lastname: string;
    complete: boolean;
    services_count: number;
    cost: number;
}