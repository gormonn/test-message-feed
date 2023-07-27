import { Link } from 'react-router-dom';
import { User } from 'entities/users';
import { useUser } from 'entities/users/lib/use-user';

export const UserLink = ({ userId }: { userId: string }) => {
    const user = useUser(userId);

    return (
        <Link
            to={`/profile/${user?.id}`}
            onClick={(e) => {
                if (!user) e.preventDefault();
            }}
        >
            <User.Container>
                <User.Avatar user={user} />
                <User.FullName user={user} />
            </User.Container>
        </Link>
    );
};
