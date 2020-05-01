import React from 'react';
import { Message, Modal, Confirm, Button, Actions, Text, Section } from 'phelia';

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
          {[
            'Salutation humains ! Je vous prierai de bien vouloir noter ce meeting',
            'Jacque à dit: “évaluer le meeting”',
          ][Math.floor(Math.random() * (2 - 0)) + 0]}
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