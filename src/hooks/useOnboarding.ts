import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

interface OnboardingStatus {
  needsOnboarding: boolean;
  loading: boolean;
  user: any | null;
}

export function useOnboarding(): OnboardingStatus {
  const { user, isLoaded } = useUser();
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dbUser, setDbUser] = useState<any | null>(null);

  useEffect(() => {
    async function checkOnboarding() {
      if (!isLoaded || !user) {
        setLoading(false);
        return;
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tariky-backend-o26r.vercel.app';
        const response = await fetch(
          `${apiUrl}/api/users/check-profile/${user.id}`
        );
        const data = await response.json();

        if (data.success) {
          setNeedsOnboarding(!data.data.isComplete);
          setDbUser(data.data.user);
        }
      } catch (error) {
        console.error('Error checking onboarding:', error);
        // On error, assume onboarding is not needed to prevent blocking user
        setNeedsOnboarding(false);
      } finally {
        setLoading(false);
      }
    }

    checkOnboarding();
  }, [user, isLoaded]);

  return { needsOnboarding, loading, user: dbUser };
}
