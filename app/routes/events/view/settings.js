import Route from '@ember/routing/route';

export default Route.extend({
  titleToken() {
    return this.l10n.t('Settings');
  },
  beforeModel() {
    let { currentUser } = this.authManager;
    if (!(currentUser.isAnAdmin || this.modelFor('events.view').owner.get('email') === currentUser.email)) {
      this.transitionTo('events.view');
    }
  },
  async model() {
    let eventDetails = this.modelFor('events.view');
    return {
      event       : await eventDetails,
      roleInvites : await eventDetails.query('roleInvites', {}),
      roles       : await this.store.findAll('role')
    };
  }
});
