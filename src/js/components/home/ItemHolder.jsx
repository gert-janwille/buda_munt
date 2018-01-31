import React from 'react';
import {inject, observer} from 'mobx-react';
import {object} from 'prop-types';

import ActivityItem from './ActivityItem';

const ItemHolder = ({activities}) => (
    <article className='home-activities-overview'>
      {activities.map(activity => <ActivityItem key={activity.id} {...activity} />)}
    </article>
  );

ItemHolder.propTypes = {
  activities: object.isRequired
};

export default inject(
  ({activityStore}) => ({
    activities: activityStore.activities
  })
)(
  observer(ItemHolder)
);
