import React from 'react';

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  description: string;
  contact: {
    email: string;
    phone?: string;
  };
}

interface TeamMemberProps {
  member: TeamMember;
}

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  console.log(member.image);
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <img
        src={member.image}
        alt={member.name}
        className="w-32 h-32 mx-auto rounded-full object-cover"
      />
      <h2 className="text-xl font-bold mt-4">{member.name}</h2>
      <h3 className="text-md font-semibold text-gray-600">{member.position}</h3>
      <p className="mt-4 text-gray-600">{member.description}</p>
      <div className="mt-4">
        <p className="font-semibold">Contact:</p>
        <p>
          Email:{' '}
          <a
            href={`mailto:${member.contact.email}`}
            className="text-blue-500 hover:text-blue-700"
          >
            {member.contact.email}
          </a>
        </p>
        {member.contact.phone && (
          <p>
            Phone:{' '}
            <a
              href={`tel:${member.contact.phone}`}
              className="text-blue-500 hover:text-blue-700"
            >
              {member.contact.phone}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamMember;
