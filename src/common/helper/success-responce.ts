import { ISuccess } from "../interface/ISeccess.interface";

export async function successRes(data : object, statusCode : number = 200): Promise <ISuccess> {
    return {
        data,
        statusCode
    }
}