import instance from '../instance';

export const leaveClass = id => {
  return new Promise((resolve, reject) => {
    instance
      .post(`/api/classroom/leave/${id}`)
      .then(response => {
        return resolve();
      })
      .catch(err => reject());
  });
};
