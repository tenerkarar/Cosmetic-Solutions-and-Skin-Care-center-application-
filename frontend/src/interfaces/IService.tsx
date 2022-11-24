
export default interface IService {
    service_id: number;
    name: string;
    description: string;
    price: number;
    points: number;
    appointment_id?: number;
}