import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students';
import RegisterStudent from '~/pages/Students/Register';
import EditStudent from '~/pages/Students/Edit';

import Plans from '~/pages/Plans';
import RegisterPlan from '~/pages/Plans/Register';
import EditPlan from '~/pages/Plans/Edit';

import Enrollments from '~/pages/Enrollments';
import RegisterEnrollment from '~/pages/Enrollments/Register';
import EditEnrollment from '~/pages/Enrollments/Edit';

import Assistances from '~/pages/Assistances';
import Error404 from '~/pages/_Error404';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/register" component={RegisterStudent} isPrivate />
      <Route path="/students/edit/:id" component={EditStudent} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/register" component={RegisterPlan} isPrivate />
      <Route path="/plans/edit/:id" component={EditPlan} isPrivate />

      <Route path="/enrollments" exact component={Enrollments} isPrivate />
      <Route
        path="/enrollments/register"
        component={RegisterEnrollment}
        isPrivate
      />
      <Route
        path="/enrollments/edit/:id"
        component={EditEnrollment}
        isPrivate
      />

      <Route path="/assistances" component={Assistances} isPrivate />
      <Route path="/*" component={Error404} isPrivate />
    </Switch>
  );
}
