import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import SmartLoader from 'atoms/SmartLoader';
import Loading from 'icons/Loading';

jest.useFakeTimers();

describe('SmartLoader', () => {
  describe('delay', () => {
    describe('displays loading icon if delay is set to 0', () => {
      let component: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
      beforeAll(() => {
        component = mount(<SmartLoader loading delay={0} />);
      });
      it('starts blank', () => {
        expect(component.children().length).toEqual(0);
        expect(component).toMatchInlineSnapshot(`
<SmartLoader
  delay={0}
  error={null}
  loading={true}
  timeout={0}
/>
`);
      });
      it('renders loading icon after a tick', () => {
        jest.advanceTimersByTime(0);
        component.update();
        expect(component.contains(<Loading />)).toBeTruthy();
        /* tslint:disable max-line-length */
        expect(component).toMatchInlineSnapshot(`
<SmartLoader
  delay={0}
  error={null}
  loading={true}
  timeout={0}
>
  <Loading>
    <svg
      className="css-m4dk6r"
      height="65px"
      viewBox="0 0 66 66"
      width="65px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="css-ybcsll"
        cx="33"
        cy="33"
        fill="none"
        r="30"
        strokeLinecap="round"
        strokeWidth="6"
      />
    </svg>
  </Loading>
</SmartLoader>
`);
        /* tslint:enable max-line-length */
      });
    });
    describe('displays nothing until after delay has passed', () => {
      let component: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
      beforeAll(() => {
        component = mount(<SmartLoader loading delay={100} />);
      });
      it('starts blank', () => {
        expect(component.children().length).toEqual(0);
        expect(component).toMatchInlineSnapshot(`
<SmartLoader
  delay={100}
  error={null}
  loading={true}
  timeout={0}
/>
`);
      });
      it('stays blank after a tick', () => {
        jest.advanceTimersByTime(0);
        component.update();
        expect(component.children().length).toEqual(0);
        expect(component).toMatchInlineSnapshot(`
<SmartLoader
  delay={100}
  error={null}
  loading={true}
  timeout={0}
/>
`);
      });
      it('renders loading icons after delay passes', () => {
        jest.advanceTimersByTime(100);
        component.update();
        expect(component.contains(<Loading />)).toBeTruthy(); /* tslint:disable max-line-length */

        expect(component).toMatchInlineSnapshot(`
<SmartLoader
  delay={100}
  error={null}
  loading={true}
  timeout={0}
>
  <Loading>
    <svg
      className="css-m4dk6r"
      height="65px"
      viewBox="0 0 66 66"
      width="65px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="css-ybcsll"
        cx="33"
        cy="33"
        fill="none"
        r="30"
        strokeLinecap="round"
        strokeWidth="6"
      />
    </svg>
  </Loading>
</SmartLoader>
`); /* tslint:enable max-line-length */
      });
    });
  });
  describe('timeout', () => {
    describe('is never triggered if timeout is 0', () => {
      it('stays as loading icon after timers have run', () => {
        const component = mount(<SmartLoader loading delay={0} timeout={0} />);
        jest.advanceTimersByTime(100);
        component.update();
        expect(component.contains(<Loading />)).toBeTruthy(); /* tslint:disable max-line-length */

        expect(component).toMatchInlineSnapshot(`
<SmartLoader
  delay={0}
  error={null}
  loading={true}
  timeout={0}
>
  <Loading>
    <svg
      className="css-m4dk6r"
      height="65px"
      viewBox="0 0 66 66"
      width="65px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="css-ybcsll"
        cx="33"
        cy="33"
        fill="none"
        r="30"
        strokeLinecap="round"
        strokeWidth="6"
      />
    </svg>
  </Loading>
</SmartLoader>
`); /* tslint:enable max-line-length */
      });
    });
    describe('renders timeout message after timeout passes', () => {
      let component: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
      beforeAll(() => {
        component = mount(<SmartLoader loading delay={10} timeout={20} />);
      });
      // console.log(component.debug());
      it('is blank while delay has not yet passed', () => {
        jest.advanceTimersByTime(9);
        component.update();
        // console.log(component.debug());
        expect(component.children().length).toEqual(0);
        expect(component).toMatchInlineSnapshot(`
<SmartLoader
  delay={10}
  error={null}
  loading={true}
  timeout={20}
/>
`);
      });
      it('renders loading icon after delay', () => {
        jest.advanceTimersByTime(1);
        component.update();
        // console.log(component.debug());
        expect(component.contains(<Loading />)).toBeTruthy(); /* tslint:disable max-line-length */

        expect(component).toMatchInlineSnapshot(`
<SmartLoader
  delay={10}
  error={null}
  loading={true}
  timeout={20}
>
  <Loading>
    <svg
      className="css-m4dk6r"
      height="65px"
      viewBox="0 0 66 66"
      width="65px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="css-ybcsll"
        cx="33"
        cy="33"
        fill="none"
        r="30"
        strokeLinecap="round"
        strokeWidth="6"
      />
    </svg>
  </Loading>
</SmartLoader>
`); /* tslint:enable max-line-length */
      });
      it('stays loading when timeout has not yet passed', () => {
        jest.advanceTimersByTime(9);
        component.update();
        // console.log(component.debug());
        expect(component.contains(<Loading />)).toBeTruthy(); /* tslint:disable max-line-length */

        expect(component).toMatchInlineSnapshot(`
<SmartLoader
  delay={10}
  error={null}
  loading={true}
  timeout={20}
>
  <Loading>
    <svg
      className="css-m4dk6r"
      height="65px"
      viewBox="0 0 66 66"
      width="65px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="css-ybcsll"
        cx="33"
        cy="33"
        fill="none"
        r="30"
        strokeLinecap="round"
        strokeWidth="6"
      />
    </svg>
  </Loading>
</SmartLoader>
`); /* tslint:enable max-line-length */
      });
      it('renders timeout message after timeout', () => {
        jest.advanceTimersByTime(1);
        component.update();
        // console.log(component.debug());
        expect(component.contains(<span>Hmmm, this seems to be taking a while</span>)).toBeTruthy();
        expect(component).toMatchInlineSnapshot(`
<SmartLoader
  delay={10}
  error={null}
  loading={true}
  timeout={20}
>
  <span>
    Hmmm, this seems to be taking a while
  </span>
</SmartLoader>
`);
      });
    });
  });
  describe('error', () => {
    it('should display a message when error supplied', () => {
      const component = mount(<SmartLoader loading delay={10} timeout={20} error={new Error()} />);
      expect(component.contains(<span>Uh oh, there's been an error.</span>)).toBeTruthy();
      expect(component).toMatchInlineSnapshot(`
<SmartLoader
  delay={10}
  error={[Error]}
  loading={true}
  timeout={20}
>
  <span>
    Uh oh, there's been an error.
  </span>
</SmartLoader>
`);
    });
  });
  describe('loading + children', () => {
    it('should display children after loading finishes', () => {
      const component = mount(
        <SmartLoader loading delay={10} timeout={20}>
          <span>smartloader also allows children</span>
        </SmartLoader>,
      );
      expect(component).toMatchInlineSnapshot(`
<SmartLoader
  delay={10}
  error={null}
  loading={true}
  timeout={20}
/>
`);
      component.setProps({ loading: false });
      expect(component.contains(<span>smartloader also allows children</span>)).toBeTruthy();
      expect(component).toMatchInlineSnapshot(`
<SmartLoader
  delay={10}
  error={null}
  loading={false}
  timeout={20}
>
  <span>
    smartloader also allows children
  </span>
</SmartLoader>
`);
    });
  });
});
