import { getDateWithOffset } from '../utils/dateUtils';

/**
 * Default sample assignments to seed localStorage on first launch
 */
export const initialAssignments = [
  {
    id: 'asg-1',
    title: 'Database Normalization & ER Diagram',
    subject: 'Database Systems',
    description: 'Design comprehensive 3NF ER diagrams and write SQL schema migrations for an online hospital management portal.',
    dueDate: getDateWithOffset(2),
    priority: 'High',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'asg-2',
    title: 'Operating System Process Scheduling Simulation',
    subject: 'Operating Systems',
    description: 'Simulate Round Robin, SJF, and Priority CPU scheduling algorithms in C++ with turnaround and waiting time metrics.',
    dueDate: getDateWithOffset(-1),
    priority: 'High',
    status: 'Pending',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 'asg-3',
    title: 'Responsive Portfolio Web App',
    subject: 'Web Technologies',
    description: 'Build a modern personal portfolio featuring responsive layout, interactive project showcases, and contact form validation.',
    dueDate: getDateWithOffset(0),
    priority: 'Medium',
    status: 'Pending',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'asg-4',
    title: 'Binary Search Tree & AVL Trees Lab',
    subject: 'Data Structures',
    description: 'Implement self-balancing AVL tree insertion and deletion algorithms and benchmark lookup efficiency against red-black trees.',
    dueDate: getDateWithOffset(6),
    priority: 'Low',
    status: 'Pending',
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'asg-5',
    title: 'TCP/IP Socket Chat Server',
    subject: 'Computer Networks',
    description: 'Develop a multi-threaded TCP client-server chatroom with room creation, broadcast messaging, and heartbeat keepalive.',
    dueDate: getDateWithOffset(-3),
    priority: 'Medium',
    status: 'Completed',
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: 'asg-6',
    title: 'Software Requirements Specification (SRS) Document',
    subject: 'Software Engineering',
    description: 'Draft IEEE 830 compliant Software Requirements Specification including use-case diagrams, data flows, and non-functional requirements.',
    dueDate: getDateWithOffset(-5),
    priority: 'Low',
    status: 'Completed',
    createdAt: new Date(Date.now() - 9 * 86400000).toISOString(),
  }
];

export const defaultSubjects = [
  'Database Systems',
  'Operating Systems',
  'Web Technologies',
  'Data Structures',
  'Computer Networks',
  'Software Engineering',
  'Artificial Intelligence',
  'Cyber Security',
  'Discrete Mathematics'
];
