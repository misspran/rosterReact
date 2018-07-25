import { shallow } from 'enzyme';
import sinon from 'sinon';
import Roster from '../../src/components/Roster';
import DeletePlayer from '../../src/components/DeletePlayer';
import RosterTable from '../../src/components/RosterTable';
import Navbar from '../../src/components/Navbar';

describe('<Roster />', () => {
  it('should render 1 <RosterTable /> components', () => {
    const wrapper = shallow(<RosterTable />);
    expect(wrapper.find(DeletePlayer)).to.have.length(1);
  });

  it('should render a <Navbar>', () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find('.icon-star')).to.have.length(1);
  });

  it('should render children when passed in', () => {
    const wrapper = shallow((
      <Roster>
        <Navbar />
        <RosterTable />
      </Roster>
    ));
    expect(wrapper.contains(<div />)).to.equal(true);
  });

  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(<DeletePlayer onButtonClick={onButtonClick} />);
    wrapper.find('button').simulate('click');
    expect(onButtonClick.calledOnce).to.equal(true);
  });
});