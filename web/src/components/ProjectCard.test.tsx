import React from 'react';
import { render } from '@testing-library/react';
import ProjectCard from './ProjectCard';

describe('ProjectCard', () => {
  it('renders title, description and stack', () => {
    const { getByText } = render(
      <ProjectCard
        title="My Project"
        description="A short description"
        stack={['React', 'TS']}
      />
    );

    expect(getByText('My Project')).toBeInTheDocument();
    expect(getByText('A short description')).toBeInTheDocument();
    expect(getByText('React')).toBeInTheDocument();
  });

  it('shows initials when no image provided', () => {
    // pass an empty string for imageSrc (falsy) so the initials fallback renders
    const { getByText } = render(
      <ProjectCard title="Alpha Beta" description="desc" imageSrc={''} />
    );

    expect(getByText('AB')).toBeInTheDocument();
  });
});
