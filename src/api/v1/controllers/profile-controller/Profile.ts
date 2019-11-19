/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
/* eslint-disable require-jsdoc */
import db from '../../../../database/models'
import { ProfileAttributes } from '../../../../database/models/profile'
import CrudController from '../../../../utils/crud';
import { APIError } from '../../validations/messages';

class UserProfile extends CrudController {
	protected model = 'Profile'

	public createProfile = async (user_name: string, res: any, next: any) => {
		try {
			const user = await db.User.find({
				where: {
					username: user_name
				}
			})
			if(user){
				const { firstname, lastname, email, username, id } = user;
				const profile: ProfileAttributes = {
					firstname,
					lastname,
					email,
					username,
					userId: id
				}
				await db.Profile.create(profile)
			}
		} catch (err) {
			next(APIError.errorResponseMessage(401, 'something went wrong', res))
		}
	}
}

export default new UserProfile()