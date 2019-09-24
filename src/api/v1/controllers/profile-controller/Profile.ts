import db from '../../../../database/models'
import { ProfileAttributes } from '../../../../database/models/profile'

class UserProfile {
	public createProfile = async (user_name: string) => {
		const user = await db.User.find({
			where: {
				username: user_name
			}
		})
		if(user){
			const { firstname, lastname, email, username } = user;
			const profile: ProfileAttributes = {
				firstname,
				lastname,
				email,
				username
			}
			await db.Profile.create(profile)
		}
	}
}

export default new UserProfile()