import React from 'react';
import { Modal, RadioButtons, Option, Input, TextField, Text } from 'phelia';

const MeetingSurveyModal = ({ useState }: any) => {
  const [form, setForm] = useState('form', {});

  return (
    <Modal title="Évaluer le meeting" submit="Envoyer">
      <Input label="Est-ce que ce meeting était efficace ?">
        <RadioButtons
          action="efficient"
          onSelect={event => setForm({ ...form, efficient: event.selected })}
        >
          <Option value="yes"><Text emoji>Oui :thumbsup:</Text></Option>
          <Option value="no"><Text emoji>Non :thumbsdown:</Text></Option>
        </RadioButtons>
      </Input>

      <Input label="Super : Que pouvons-nous apprendre ?">
        <TextField
          action="comment"
          placeholder="Un petit commentaire serait bienvenu"
          multiline
        />
      </Input>
    </Modal>
  );
};

export default MeetingSurveyModal;