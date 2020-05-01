import dotenv from 'dotenv';
import React from 'react';
import { Message, Button, Actions, Text, Section } from 'phelia';
import Airtable from 'airtable';

import MeetingSurveyModal from './MeetingSurveyModal';

dotenv.config();
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE);

const MeetingSurvey = ({ useModal, props }: any) => {  
  const openModal = useModal(
    "survey-modal",
    MeetingSurveyModal,
    (event: any) => {
      base('slack_answers').create([{
        fields: {
          meeting: props.text,
          user: props.user_name,
          efficient: event.form.efficient === 'yes',
          comment: event.form.comment
        }
      }]);
    },
  );

  return (
    <Message>
      <Section>
        <Text emoji>
          Salutation humains ! Je vous prierai de bien vouloir noter le meeting {props.text !== '' && `“${props.text}”`}
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