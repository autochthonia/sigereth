import React from 'react';
import Flex, { FlexUl, FlexLi } from 'atoms/Flex';
import { FullCharacter as TFullCharacter, ABILITIES, ATTRIBUTE_GROUPS } from 'types/Character';
import styled from 'react-emotion';
import { map } from 'lodash';
import Dotscale from 'atoms/Dotscale';

const SmallCaps = styled.span({ fontVariant: 'small-caps' });

const Attributes = ({ attributes }: { attributes: TFullCharacter['attributes'] }) => (
  <Flex flexDirection="column">
    <Flex>Attributes</Flex>
    <Flex>
      {map(ATTRIBUTE_GROUPS, (attrs, key) => (
        <Flex flexDirection="column" key={key}>
          <SmallCaps>{key}</SmallCaps>
          {attrs.map(l => (
            <Flex key={l}>
              <SmallCaps>{l}</SmallCaps>
              <Dotscale value={attributes[l]} />
            </Flex>
          ))}
        </Flex>
      ))}
    </Flex>
  </Flex>
);
const Abilities = ({ abilities }: { abilities: TFullCharacter['abilities'] }) => (
  <Flex flexDirection="column">
    <Flex>Attributes</Flex>
    <Flex flexDirection="column">
      {ABILITIES.map(key => (
        <Flex key={key}>
          <SmallCaps>{key}</SmallCaps>
          <Dotscale value={abilities[key]} />
        </Flex>
      ))}
    </Flex>
  </Flex>
);
const Specialties = ({ specialties }: { specialties: TFullCharacter['specialties'] }) => (
  <Flex>
    <SmallCaps>Specialties</SmallCaps>
    <FlexUl>
      {map(specialties, (description, ability) => (
        <FlexLi key={ability}>
          {ability}: {description}
        </FlexLi>
      ))}
    </FlexUl>
  </Flex>
);

const Merits = ({ merits }: { merits: TFullCharacter['merits'] }) => (
  <Flex>
    {map(merits, (dots, label) => (
      <Flex key={label}>
        <SmallCaps>{label}</SmallCaps>
        <Dotscale value={dots} />
      </Flex>
    ))}
  </Flex>
);

const Willpower = ({
  willpower: { permanent: permanentWillpower, temporary: temporaryWillpower },
}: {
  willpower: TFullCharacter['willpower'];
}) => (
  <Flex flexDirection="column">
    <SmallCaps>Willpower</SmallCaps>
    <Dotscale value={permanentWillpower} scale={10} />
    <Dotscale value={temporaryWillpower} scale={10} />
  </Flex>
);

const LimitBreak = ({ limit }: { limit: TFullCharacter['limit'] }) => (
  <Flex flexDirection="column">
    <SmallCaps>Limit Break</SmallCaps>
    <Dotscale value={limit} scale={10} />
  </Flex>
);
const LimitTrigger = ({ limitTrigger }: { limitTrigger: TFullCharacter['limitTrigger'] }) => (
  <Flex flexDirection="column">
    <SmallCaps>Limit Break</SmallCaps>
    {limitTrigger}
  </Flex>
);

const Experience = ({
  experience: { regularTotal = 0, solarTotal = 0, regularCurrent = 0, solarCurrent = 0 },
}: {
  experience: TFullCharacter['experience'];
}) => (
  <Flex>
    <Flex flexDirection="column">
      <SmallCaps>Experience</SmallCaps>
      <Flex>
        <SmallCaps>Cu rrent</SmallCaps>
        <span>{regularCurrent}</span>
        <SmallCaps>Total</SmallCaps>
        <span>{regularTotal}</span>
      </Flex>
    </Flex>
    <Flex flexDirection="column">
      <SmallCaps>Solar Experience</SmallCaps>
      <Flex>
        <SmallCaps>Current</SmallCaps>
        <span>{solarCurrent}</span>
        <SmallCaps>Total</SmallCaps>
        <span>{solarTotal}</span>
      </Flex>
    </Flex>
  </Flex>
);

const Weapons = ({ weapons }: { weapons: TFullCharacter['weapons'] }) => (
  <Flex>
    <SmallCaps>Weapons</SmallCaps>
    <FlexUl>
      {weapons.map(w => (
        <FlexLi>
          {w.name}: {w.accuracy}, {w.damage}, {w.defense} {w.overwhelming} {w.tags}
        </FlexLi>
      ))}
    </FlexUl>
  </Flex>
);
const Armor = ({ armor }: { armor: TFullCharacter['armor'] }) => (
  <Flex>
    <SmallCaps>Weapons</SmallCaps>
    <FlexUl>
      {armor.map(a => (
        <FlexLi>
          {a.name} {a.category} {a.mobilityPenalty} {a.tags}
        </FlexLi>
      ))}
    </FlexUl>
  </Flex>
);

const FullCharacter = (character: TFullCharacter) => (
  <Flex>
    <Flex>Name: {character.name}</Flex>
    <Flex>
      <Attributes attributes={character.attributes} />
    </Flex>
    <Abilities abilities={character.abilities} />
    <Specialties specialties={character.specialties} />
    <Merits merits={character.merits} />
    <Willpower willpower={character.willpower} />
    <LimitBreak limit={character.limit} />
    <LimitTrigger limitTrigger={character.limitTrigger} />
    <Experience experience={character.experience} />
    <Weapons weapons={character.weapons} />
    <Armor armor={character.armor} />
  </Flex>
);

export default FullCharacter;
