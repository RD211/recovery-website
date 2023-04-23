import React from 'react';
import TeamMemberComponent, { TeamMember } from './TeamMember';
import daianaImage from '../assets/daiana.jpg';
import mihaelaImage from '../assets/mihaela.jpg';

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Daiana Dinucu',
    position: 'Avocat',
    image: daianaImage,
    description: `Avocat, membru al Baroului Bucuresti di 2005, practician în insolvență si administrator si
    lichidator in cadrul procedurii insolventei persoanelor fizice, Daiana, un avocat cu o vastă
    experiență în legislația fiscală și în dreptul societar, în redactarea, negocierea și executarea
    contractelor, în realizarea de rapoarte due-dilligence, analize de specialitate privind legislația în
    domeniul insolvenței. Ambiția, tenacitatea și persuasiunea, fac din Daiana un adversar redutabil
    în negocieri și în apărarea intereselor clienților noștri.`,
    contact: {
      email: 'daiana.dinucu@recoverysolutions.ro',
      phone: '0784034203',
    },
  },
  {
    id: 2,
    name: 'Mihaela Murariu',
    position: 'Doctor în economie',
    image: mihaelaImage,
    description: `Doctor în economie, specializată pe managementul de criză, formarea academică incluzând
    specializare în management la UNIVERSIDAD de Las Islas Baleares, Spania. Mihaela este
    expert contabil din 1995, practician în insolvență din 1999, membru INSOL Europe, membru a
    Camerei Auditorilor Financiari și coordonator de stagiu pentru practicienii stagiari. Din 2001,
    admisă ca doctorand în domeniul economic, a efectuat studii și analize concretizate în lucrări de
    specialitate pe tema rolului informației contabile în procedura de insolvență și al primordialității
    factorului economic în detrimentul celui juridic.`,
    contact: {
      email: 'mihaela.murariu@recoverysolutions.ro',
    },
  },
];

const Team: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Echipa</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teamMembers.map((member) => (
          <TeamMemberComponent key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Team;
