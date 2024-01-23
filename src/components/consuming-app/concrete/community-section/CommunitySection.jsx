import React from 'react';
import {useAppData} from '../../smart/app-state/AppStateProvider';

export const CommunitySection = () => {
  return (
    <div>{/*TODO: Might want to have a section component and/or move the section element out to template and use div. This would be to allow content to be added via portal underneath the content of the section if the section is flex-column.*/}
      <h4>Community Section</h4>
      <div>
      </div>
    </div>
  );
}
