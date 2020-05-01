import React from 'react';
import { Message, Button, Actions, Text, Section } from 'phelia';

import MeetingSurveyModal from './MeetingSurveyModal';

const MeetingSurvey = ({ useModal }: any) => {
  const openModal = useModal(
    "survey-modal",
    MeetingSurveyModal,
    (event: any) => console.log(JSON.stringify(event, null, 2)),
  );

  return (
    <Message>
      <Section>
        <Text emoji>
          Salutation humains ! Je vous prierai de bien vouloir noter ce meeting
        </Text>
      </Section>
      <Actions>
        <Button
          action="modal"
          onClick={() => openModal()}
          emoji
        >
          Évaluer  :thumbsup: :thumbsdown:
        </Button>
      </Actions>
    </Message>
  );
};

export default MeetingSurvey;