// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function generateRandomUPRN() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 10 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

function getRandomDateWithinLast30Days() {
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - Math.floor(Math.random() * 30));
  return pastDate;
}

function getRandomStatus() {
  const statuses = ['IN_PROGRESS', 'READY_FOR_SUPERVISOR', 'COMPLETE'];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

async function main() {
  const userData = {
    auth0Id: 'auth0|670c2ae65c7290eef380b6d3',
    name: 'Keith Jamie Hardy',
    email: 'keithjnrhardy@gmail.com',
    picture: 'https://hjy7azd3yz1lvdsc.public.blob.vercel-storage.com/profile-picture-1732878683379-FK5OxQlq0b9EN0AZXlQ0e770XZT6hT.webp',
  };

  const user = await prisma.user.create({ data: userData });

  const settingsData = {
    name: 'AB Building and Electrical LTD',
    email: 'info@abelec.org',
    phone: '08452657544',
    logoUrl: '',
    governingBody: 'NICEIC',
    governingBodyNumber: 'GB123456',
    address: {
      create: {
        streetAddress: 'The Commercial Hotel, 3 Page Lane',
        city: 'Manchester',
        county: 'Greater Manchester',
        postTown: 'Wythenshawe',
        postcode: 'M22 9TA',
      },
    },
  };

  await prisma.settings.create({ data: settingsData });

  const clientData = [
    {
      name: 'Wythenshawe Community Housing Group',
      email: 'customerenquiries@wchg.org.uk',
      phone: '0800 633 5500',
      logoUrl: '',
      address: {
        create: {
          streetAddress: 'Wythenshawe House, 8 Poundswick Lane',
          city: 'Manchester',
          county: 'Greater Manchester',
          postTown: 'Wythenshawe',
          postcode: 'M22 9TA',
        },
      },
    },
    {
      name: 'Salix Homes',
      email: 'enquiries@salixhomes.co.uk',
      phone: '0800 218 2000',
      logoUrl: '',
      address: {
        create: {
          streetAddress: 'Diamond House, 2 Peel Cross Road',
          city: 'Salford',
          county: 'Greater Manchester',
          postTown: 'Salford',
          postcode: 'M5 4DT',
        },
      },
    },
    {
      name: 'Stockport Homes',
      email: 'customer.feedback@stockporthomes.org',
      phone: '0161 217 6016',
      logoUrl: '',
      address: {
        create: {
          streetAddress: 'Cornerstone, 2 Edward Street',
          city: 'Stockport',
          county: 'Greater Manchester',
          postTown: 'Stockport',
          postcode: 'SK1 3NQ',
        },
      },
    },
    {
      name: 'Salford City Council',
      email: '',
      phone: '0161 794 4711',
      logoUrl: '',
      address: {
        create: {
          streetAddress: 'Civic Centre, Chorley Road',
          city: 'Salford',
          county: 'Greater Manchester',
          postTown: 'Swinton',
          postcode: 'M27 5DA',
        },
      },
    },
  ];

  const clients = await Promise.all(clientData.map((client) => prisma.client.create({ data: client })));

  const areaAddresses = ['Wythenshawe', 'Salford', 'Stockport', 'Swinton'];

  const propertyData = Array.from({ length: 100 }, () => {
    const randomClientIndex = Math.floor(Math.random() * clients.length);
    const randomAddress = areaAddresses[randomClientIndex];
    return {
      uprn: generateRandomUPRN(),
      occupier: Math.random() < 0.5 ? 'Tenanted' : 'Void',
      clientId: clients[randomClientIndex].id,
      address: {
        create: {
          streetAddress: `Random Street ${Math.floor(Math.random() * 100)}`,
          city: 'Manchester',
          county: 'Greater Manchester',
          postTown: randomAddress,
          postcode: `M${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
        },
      },
    };
  });

  const properties = await Promise.all(propertyData.map((property) => prisma.property.create({ data: property })));

  const certificateTypes = [
    'ELECTRICAL_INSTALLATION_CONDITION_REPORT',
    'ELECTRICAL_INSTALLATION_CERTIFICATE',
    'MINOR_WORKS',
    'FIRE_SAFETY_DESIGN_SUMMARY',
    'DOMESTIC_VENTILATION_COMMISSIONING_SHEET',
  ] as const;

  const certificateData = properties.flatMap((property) =>
    certificateTypes.map((certificateType) => {
      const relatedField = {
        ELECTRICAL_INSTALLATION_CONDITION_REPORT: 'electricalInstallationConditionReport',
        ELECTRICAL_INSTALLATION_CERTIFICATE: 'electricalInstallationCertificate',
        MINOR_WORKS: 'minorWorks',
        FIRE_SAFETY_DESIGN_SUMMARY: 'fireSafetyDesignSummary',
        DOMESTIC_VENTILATION_COMMISSIONING_SHEET: 'domesticVentilationCommissioningSheet',
      }[certificateType];

      return {
        certificateType: certificateType,
        date: getRandomDateWithinLast30Days(),
        propertyId: property.id,
        userId: user.id,
        status: getRandomStatus(),
        [relatedField]: {
          create: {},
        },
      };
    })
  );

  await Promise.all(certificateData.map((certificate) => prisma.certificate.create({ data: certificate })));


  console.log('Seeding successful.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
