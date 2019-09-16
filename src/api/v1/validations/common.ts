import jsonResponse from "../../../utils/jsonResponse";
import { APIError } from "./messages";
import db from "../../../database/models";
import { Op } from "sequelize";

class commonValidators {
  public verifyFields (requiredFields: string[], fields: {}, res: any, next: any) {
    const givenFields = Object.getOwnPropertyNames(fields)
    if (!requiredFields.every(field => givenFields.includes(field))) {
      let missingField = requiredFields.filter(item => givenFields.indexOf(item) == -1)
      return next(APIError.errorResponseMessage(
          400,
          'Missing Fields',
          res,
          missingField))
    }
    else {
      next()
    }
  }
  public verifyDuplication = async (input: any[],relation: string, res: any, next: any) => {
    // @ts-ignore
    const availableItems: [] = await db[`${relation}`].findAll({
      where: {
        [Op.or]: input,
      },
    })
    availableItems.length > 0 ? next(APIError.errorResponseMessage(
      400,
      'email / username already existing',
      res,
      )) : next()
  }
}

export default new commonValidators();
