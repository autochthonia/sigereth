import React from 'react';
import Flex, { FlexUl, FlexLi } from 'atoms/Flex';
import { Character, ABILITIES, ATTRIBUTE_GROUPS } from 'types';
import styled from 'react-emotion';
import { map } from 'lodash';
import Dotscale from 'atoms/Dotscale';

const SmallCaps = styled.span({ fontVariant: 'small-caps' });

const Attributes = ({ attributes }: { attributes: Character['attributes'] }) => (
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
const Abilities = ({ abilities }: { abilities: Character['abilities'] }) => (
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
const Specialties = ({ specialties }: { specialties: Character['specialties'] }) => (
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

const Merits = ({ merits }: { merits: Character['merits'] }) => (
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
  willpower: Character['willpower'];
}) => (
  <Flex flexDirection="column">
    <SmallCaps>Willpower</SmallCaps>
    <Dotscale value={permanentWillpower} scale={10} />
    <Dotscale value={temporaryWillpower} scale={10} />
  </Flex>
);

const LimitBreak = ({ limit }: { limit: Character['limit'] }) => (
  <Flex flexDirection="column">
    <SmallCaps>Limit Break</SmallCaps>
    <Dotscale value={limit} scale={10} />
  </Flex>
);
const LimitTrigger = ({ limitTrigger }: { limitTrigger: Character['limitTrigger'] }) => (
  <Flex flexDirection="column">
    <SmallCaps>Limit Break</SmallCaps>
    {limitTrigger}
  </Flex>
);

const Experience = ({
  experience: { regularTotal = 0, solarTotal = 0, regularCurrent = 0, solarCurrent = 0 },
}: {
  experience: Character['experience'];
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

const Character = (character: Character) => (
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
  </Flex>
);

export default Character;
