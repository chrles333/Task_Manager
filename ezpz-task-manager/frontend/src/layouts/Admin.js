/** This defines the layout of the page when user logs into the app. Creates a route for all pages within the app.
 */
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views
import Forum from "views/admin/Forum";
import Settings from "views/admin/Settings.js";
import Groups from "views/admin/Groups";
import Taskboard from "views/admin/Taskboard";
import Connections from "views/admin/Connections";
import Profile from "views/admin/Profile";
import Resources from "views/admin/Resources";
import ResourceBoard from "views/admin/ResourceBoard";

import Availabilities from "views/admin/Availabilities";
import SearchResults from "views/admin/SearchResults";
import FormSearchTask from "components/Items/FormSearchTask";
import ForumGroups from "views/admin/ForumGroups";
import Spinner from "components/Items/Spinner";
import GroupInvitations from "views/admin/GroupInvitations";
import Tasks from "views/admin/Tasks";

export default function Admin() {
  const [showSearchModal, setShowSearchModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  return (
    <div>
      <Sidebar />
      <div className="relative md:ml-64 " style={{ backgroundColor: "white" }}>
        <AdminNavbar setShowSearchModal={setShowSearchModal} />
        {/* Header */}
        <HeaderStats />

        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="px-4 md:px-10 mx-auto w-full -m-24 heightScreen">
            {showSearchModal && (
              <div className="flex w-full justify-center">
                <FormSearchTask
                  showSearchModal={showSearchModal}
                  setShowSearchModal={setShowSearchModal}
                  setLoading={setLoading}
                />
              </div>
            )}

            <Switch>
              <Route path="/app/settings" exact component={Settings} />
              <Route path="/app/profile/:id" exact component={Profile} />
              <Route path="/app/tasks/" exact component={Tasks} />
              <Route path="/app/groups" exact component={Groups} />
              <Route path="/app/taskboard/:id" exact component={Taskboard} />
              <Route path="/app/forum/:id" exact component={Forum} />
              <Route path="/app/connections" exact component={Connections} />
              <Route path="/app/resources" exact component={Resources} />
              <Route
                path="/app/resources/:id"
                exact
                component={ResourceBoard}
              />
              <Route
                path="/app/invitations"
                exact
                component={GroupInvitations}
              />
              <Route
                path="/app/availabilities"
                exact
                component={Availabilities}
              />
              <Route path="/app/search" exact component={SearchResults} />
              <Route path="/app/groupForum/" exact component={ForumGroups} />
              <Redirect from="/app" to="/auth/login" />
            </Switch>
            <FooterAdmin />
          </div>
        )}
      </div>
    </div>
  );
}
