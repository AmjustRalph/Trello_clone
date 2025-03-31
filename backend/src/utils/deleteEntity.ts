import { pool } from "../config/db_connect";
import { throwError } from "./throwError";


export const deleteEntity = async (tableName : string, id: number, entityName: string) => {
    if (isNaN(id)) throwError(`Invalid ${entityName} ID. It must be a number.`, 400);

    const { rowCount, rows } = await pool.query(
        `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`, 
        [id]
    );

    if (!rowCount) throwError(`${entityName} not found`, 404);
    return rows[0];
};


