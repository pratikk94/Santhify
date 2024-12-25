interface UserAvatarProps {
  photoUrl?: string | null;
  firstName?: string;
  lastName?: string;
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar = ({ photoUrl, firstName = '', lastName = '', size = 'md' }: UserAvatarProps) => {
  const getInitials = () => {
    const firstInitial = firstName?.charAt(0) || '';
    const lastInitial = lastName?.charAt(0) || '';
    return (firstInitial + lastInitial).toUpperCase();
  };

  const sizeClasses = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-24 h-24 text-3xl',
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center bg-primary-100 text-primary-600 font-semibold`}
    >
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span>{getInitials()}</span>
      )}
    </div>
  );
};

export default UserAvatar; 