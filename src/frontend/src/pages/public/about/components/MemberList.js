import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import MemberItem from './MemberItem';

MemberList.defaultProps = {
  members: [],
};

MemberList.propTypes = {
  members: PropTypes.array,
};

function MemberList({ members }) {
  return (
    <Grid container spacing={6}>
      {members.map((member, key) => (
        <MemberItem key={key} name={member.name} avatar={member.avatar} role={member.role} />
      ))}
    </Grid>
  );
}

export default MemberList;
